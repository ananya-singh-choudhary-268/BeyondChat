<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape oldest blogs from BeyondChats';

    public function handle()
    {
        $this->info('Fetching blog listing page...');

        $response = Http::get('https://beyondchats.com/blogs/');

        if (!$response->successful()) {
            $this->error('Failed to fetch blog page');
            return;
        }

        $crawler = new Crawler($response->body());

        // NOTE:
        // We assume the last page contains the oldest articles.
        // For simplicity, we pick the last 5 blog cards found.
        $blogLinks = collect(
            $crawler->filter('a[href^="https://beyondchats.com/blogs/"]')
                ->each(fn ($node) => $node->attr('href'))
        )
        ->filter(fn ($link) =>
            !str_contains($link, '/tag/') &&
            !str_contains($link, '/page/')
        )
        ->unique()
        ->take(-5);

        foreach ($blogLinks as $link) {
            $this->info("Scraping: $link");

            if (Article::where('source_url', $link)->exists()) {
                $this->info('Already exists, skipping');
                continue;
            }

            $articleResponse = Http::get($link);
            if (!$articleResponse->successful()) {
                $this->error("Failed to fetch article: $link");
                continue;
            }

            $articleCrawler = new Crawler($articleResponse->body());

            try {
                $title = $articleCrawler->filter('h1')->first()->text();
                $content = $articleCrawler->filter('article')->html();
            } catch (\Exception $e) {
                $this->error("Parsing failed for $link");
                continue;
            }

            Article::create([
                'title' => $title,
                'content' => $content,
                'source_url' => $link,
                'source' => 'beyondchats',
            ]);

            $this->info('Saved successfully');
        }

        $this->info('Scraping completed');
    }
}
