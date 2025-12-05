ALTER TABLE "videos" DROP CONSTRAINT "videos_id_unique";--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "download_url" text;