import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-vercel-postgres'
import { sql } from 'drizzle-orm'

async function exec(db: any, sqlStr: string) {
  await db.execute(sql.raw(sqlStr))
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Categories
  await exec(db, `CREATE TABLE IF NOT EXISTS "categories" ("id" integer PRIMARY KEY NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying, "order" numeric, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);`)
  await exec(db, `CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" ("slug");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "categories_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "categories_id_seq" OWNED BY "categories"."id";`)
  await exec(db, `ALTER TABLE ONLY "categories" ALTER COLUMN "id" SET DEFAULT nextval('categories_id_seq'::regclass);`)

  // 2. Media
  await exec(db, `CREATE TABLE IF NOT EXISTS "media" ("id" integer PRIMARY KEY NOT NULL, "alt" character varying NOT NULL, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "url" character varying, "thumbnail_u_r_l" character varying, "filename" character varying, "mime_type" character varying, "filesize" numeric, "width" numeric, "height" numeric, "focal_x" numeric, "focal_y" numeric, "sizes_thumbnail_url" character varying, "sizes_thumbnail_width" numeric, "sizes_thumbnail_height" numeric, "sizes_thumbnail_mime_type" character varying, "sizes_thumbnail_filesize" numeric, "sizes_thumbnail_filename" character varying, "sizes_card_url" character varying, "sizes_card_width" numeric, "sizes_card_height" numeric, "sizes_card_mime_type" character varying, "sizes_card_filesize" numeric, "sizes_card_filename" character varying, "sizes_hero_url" character varying, "sizes_hero_width" numeric, "sizes_hero_height" numeric, "sizes_hero_mime_type" character varying, "sizes_hero_filesize" numeric, "sizes_hero_filename" character varying);`)
  await exec(db, `CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" ("sizes_card_filename");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "media_sizes_hero_sizes_hero_filename_idx" ON "media" ("sizes_hero_filename");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "media_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "media_id_seq" OWNED BY "media"."id";`)
  await exec(db, `ALTER TABLE ONLY "media" ALTER COLUMN "id" SET DEFAULT nextval('media_id_seq'::regclass);`)

  // 3. Payload KV
  await exec(db, `CREATE TABLE IF NOT EXISTS "payload_kv" ("id" integer PRIMARY KEY NOT NULL, "key" character varying NOT NULL, "data" jsonb NOT NULL);`)
  await exec(db, `CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" ("key");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "payload_kv_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "payload_kv_id_seq" OWNED BY "payload_kv"."id";`)
  await exec(db, `ALTER TABLE ONLY "payload_kv" ALTER COLUMN "id" SET DEFAULT nextval('payload_kv_id_seq'::regclass);`)

  // 4. Payload Locked Documents
  await exec(db, `CREATE TABLE IF NOT EXISTS "payload_locked_documents" ("id" integer PRIMARY KEY NOT NULL, "global_slug" character varying, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" ("global_slug");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "payload_locked_documents_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "payload_locked_documents_id_seq" OWNED BY "payload_locked_documents"."id";`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents" ALTER COLUMN "id" SET DEFAULT nextval('payload_locked_documents_id_seq'::regclass);`)

  // 5. Payload Locked Documents Rels
  await exec(db, `CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" ("id" integer PRIMARY KEY NOT NULL, "order" integer, "parent_id" integer NOT NULL, "path" character varying NOT NULL, "users_id" integer, "media_id" integer, "projects_id" integer, "categories_id" integer, "services_id" integer, "testimonials_id" integer);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" ("order");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" ("parent_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" ("path");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" ("users_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" ("media_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" ("projects_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" ("categories_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" ("services_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" ("testimonials_id");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "payload_locked_documents_rels_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "payload_locked_documents_rels_id_seq" OWNED BY "payload_locked_documents_rels"."id";`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ALTER COLUMN "id" SET DEFAULT nextval('payload_locked_documents_rels_id_seq'::regclass);`)

  // 6. Payload Migrations
  await exec(db, `CREATE TABLE IF NOT EXISTS "payload_migrations" ("id" integer PRIMARY KEY NOT NULL, "name" character varying, "batch" numeric, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "payload_migrations_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "payload_migrations_id_seq" OWNED BY "payload_migrations"."id";`)
  await exec(db, `ALTER TABLE ONLY "payload_migrations" ALTER COLUMN "id" SET DEFAULT nextval('payload_migrations_id_seq'::regclass);`)

  // 7. Payload Preferences
  await exec(db, `CREATE TABLE IF NOT EXISTS "payload_preferences" ("id" integer PRIMARY KEY NOT NULL, "key" character varying, "value" jsonb, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "payload_preferences_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "payload_preferences_id_seq" OWNED BY "payload_preferences"."id";`)
  await exec(db, `ALTER TABLE ONLY "payload_preferences" ALTER COLUMN "id" SET DEFAULT nextval('payload_preferences_id_seq'::regclass);`)

  // 8. Payload Preferences Rels
  await exec(db, `CREATE TABLE IF NOT EXISTS "payload_preferences_rels" ("id" integer PRIMARY KEY NOT NULL, "order" integer, "parent_id" integer NOT NULL, "path" character varying NOT NULL, "users_id" integer);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" ("users_id");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "payload_preferences_rels_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "payload_preferences_rels_id_seq" OWNED BY "payload_preferences_rels"."id";`)
  await exec(db, `ALTER TABLE ONLY "payload_preferences_rels" ALTER COLUMN "id" SET DEFAULT nextval('payload_preferences_rels_id_seq'::regclass);`)

  // 9. Projects
  await exec(db, `CREATE TABLE IF NOT EXISTS "projects" ("id" integer PRIMARY KEY NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "category_id" integer NOT NULL, "cover_image_id" integer NOT NULL, "client" character varying, "description" character varying, "date" timestamp(3) with time zone, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);`)
  await exec(db, `CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" ("slug");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_category_idx" ON "projects" ("category_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_cover_image_idx" ON "projects" ("cover_image_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "projects_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "projects_id_seq" OWNED BY "projects"."id";`)
  await exec(db, `ALTER TABLE ONLY "projects" ALTER COLUMN "id" SET DEFAULT nextval('projects_id_seq'::regclass);`)

  // 10. Projects Gallery
  await exec(db, `CREATE TABLE IF NOT EXISTS "projects_gallery" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" character varying NOT NULL, "image_id" integer NOT NULL, "caption" character varying);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_gallery_order_idx" ON "projects_gallery" ("_order");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_gallery_parent_id_idx" ON "projects_gallery" ("_parent_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_gallery_image_idx" ON "projects_gallery" ("image_id");`)

  // 11. Projects Texts
  await exec(db, `CREATE TABLE IF NOT EXISTS "projects_texts" ("id" integer PRIMARY KEY NOT NULL, "order" integer NOT NULL, "parent_id" integer NOT NULL, "path" character varying NOT NULL, "text" character varying);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "projects_texts_order_parent" ON "projects_texts" ("order", "parent_id");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "projects_texts_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "projects_texts_id_seq" OWNED BY "projects_texts"."id";`)
  await exec(db, `ALTER TABLE ONLY "projects_texts" ALTER COLUMN "id" SET DEFAULT nextval('projects_texts_id_seq'::regclass);`)

  // 12. Services
  await exec(db, `CREATE TABLE IF NOT EXISTS "services" ("id" integer PRIMARY KEY NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "short_description" character varying NOT NULL, "description" jsonb, "icon" character varying, "order" numeric, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);`)
  await exec(db, `CREATE UNIQUE INDEX IF NOT EXISTS "services_slug_idx" ON "services" ("slug");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "services_updated_at_idx" ON "services" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "services_created_at_idx" ON "services" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "services_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "services_id_seq" OWNED BY "services"."id";`)
  await exec(db, `ALTER TABLE ONLY "services" ALTER COLUMN "id" SET DEFAULT nextval('services_id_seq'::regclass);`)

  // 13. Services Badges
  await exec(db, `CREATE TABLE IF NOT EXISTS "services_badges" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" character varying NOT NULL, "label" character varying NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "services_badges_order_idx" ON "services_badges" ("_order");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "services_badges_parent_id_idx" ON "services_badges" ("_parent_id");`)

  // 14. Settings (singleton/global)
  await exec(db, `CREATE TABLE IF NOT EXISTS "settings" ("id" integer PRIMARY KEY NOT NULL, "site_name" character varying DEFAULT 'SIFMO Printing'::character varying NOT NULL, "tagline" character varying DEFAULT 'Where Precision Meets Print'::character varying, "logo_id" integer, "hero_description" character varying, "about_content" jsonb, "contact_info_address" character varying, "contact_info_phone" character varying, "contact_info_email" character varying, "contact_info_hours" character varying, "updated_at" timestamp(3) with time zone, "created_at" timestamp(3) with time zone);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "settings_logo_idx" ON "settings" ("logo_id");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "settings_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "settings_id_seq" OWNED BY "settings"."id";`)
  await exec(db, `ALTER TABLE ONLY "settings" ALTER COLUMN "id" SET DEFAULT nextval('settings_id_seq'::regclass);`)

  // 15. Settings Social Links
  await exec(db, `CREATE TABLE IF NOT EXISTS "settings_social_links" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" character varying NOT NULL, "platform" character varying NOT NULL, "url" character varying NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "settings_social_links_order_idx" ON "settings_social_links" ("_order");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "settings_social_links_parent_id_idx" ON "settings_social_links" ("_parent_id");`)

  // 16. Settings Stats
  await exec(db, `CREATE TABLE IF NOT EXISTS "settings_stats" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" character varying NOT NULL, "label" character varying NOT NULL, "value" character varying NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "settings_stats_order_idx" ON "settings_stats" ("_order");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "settings_stats_parent_id_idx" ON "settings_stats" ("_parent_id");`)

  // 17. Testimonials
  await exec(db, `CREATE TABLE IF NOT EXISTS "testimonials" ("id" integer PRIMARY KEY NOT NULL, "client_name" character varying NOT NULL, "company" character varying, "role" character varying, "quote" character varying NOT NULL, "photo_id" integer, "rating" numeric DEFAULT 5, "featured" boolean DEFAULT false, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "testimonials_photo_idx" ON "testimonials" ("photo_id");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "testimonials_updated_at_idx" ON "testimonials" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "testimonials_created_at_idx" ON "testimonials" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "testimonials_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "testimonials_id_seq" OWNED BY "testimonials"."id";`)
  await exec(db, `ALTER TABLE ONLY "testimonials" ALTER COLUMN "id" SET DEFAULT nextval('testimonials_id_seq'::regclass);`)

  // 18. Users
  await exec(db, `CREATE TABLE IF NOT EXISTS "users" ("id" integer PRIMARY KEY NOT NULL, "name" character varying NOT NULL, "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "email" character varying NOT NULL, "reset_password_token" character varying, "reset_password_expiration" timestamp(3) with time zone, "salt" character varying, "hash" character varying, "login_attempts" numeric DEFAULT 0, "lock_until" timestamp(3) with time zone);`)
  await exec(db, `CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" ("updated_at");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");`)
  await exec(db, `CREATE SEQUENCE IF NOT EXISTS "users_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`)
  await exec(db, `ALTER SEQUENCE "users_id_seq" OWNED BY "users"."id";`)
  await exec(db, `ALTER TABLE ONLY "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq'::regclass);`)

  // 19. Users Sessions
  await exec(db, `CREATE TABLE IF NOT EXISTS "users_sessions" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" character varying NOT NULL, "created_at" timestamp(3) with time zone, "expires_at" timestamp(3) with time zone NOT NULL);`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" ("_order");`)
  await exec(db, `CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");`)

  // 20. Foreign Keys
  await exec(db, `ALTER TABLE ONLY "projects" ADD CONSTRAINT IF NOT EXISTS "projects_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL;`)
  await exec(db, `ALTER TABLE ONLY "projects" ADD CONSTRAINT IF NOT EXISTS "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL;`)
  await exec(db, `ALTER TABLE ONLY "projects_gallery" ADD CONSTRAINT IF NOT EXISTS "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;`)
  await exec(db, `ALTER TABLE ONLY "projects_gallery" ADD CONSTRAINT IF NOT EXISTS "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "projects_texts" ADD CONSTRAINT IF NOT EXISTS "projects_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "projects"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "services_badges" ADD CONSTRAINT IF NOT EXISTS "services_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "services"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "settings" ADD CONSTRAINT IF NOT EXISTS "settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL;`)
  await exec(db, `ALTER TABLE ONLY "settings_social_links" ADD CONSTRAINT IF NOT EXISTS "settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "settings_stats" ADD CONSTRAINT IF NOT EXISTS "settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "testimonials" ADD CONSTRAINT IF NOT EXISTS "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL;`)
  await exec(db, `ALTER TABLE ONLY "users_sessions" ADD CONSTRAINT IF NOT EXISTS "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ADD CONSTRAINT IF NOT EXISTS "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ADD CONSTRAINT IF NOT EXISTS "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ADD CONSTRAINT IF NOT EXISTS "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ADD CONSTRAINT IF NOT EXISTS "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "projects"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ADD CONSTRAINT IF NOT EXISTS "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ADD CONSTRAINT IF NOT EXISTS "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_locked_documents_rels" ADD CONSTRAINT IF NOT EXISTS "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "testimonials"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_preferences_rels" ADD CONSTRAINT IF NOT EXISTS "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE CASCADE;`)
  await exec(db, `ALTER TABLE ONLY "payload_preferences_rels" ADD CONSTRAINT IF NOT EXISTS "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const tables = [
    'users_sessions', 'users', 'testimonials', 'settings_stats',
    'settings_social_links', 'settings', 'services_badges', 'services',
    'projects_texts', 'projects_gallery', 'projects', 'payload_preferences_rels',
    'payload_preferences', 'payload_migrations', 'payload_locked_documents_rels',
    'payload_locked_documents', 'payload_kv', 'media', 'categories'
  ]
  for (const t of tables) {
    await exec(db, `DROP TABLE IF EXISTS "${t}" CASCADE;`)
  }
}
