TRUNCATE TABLE "Channel" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Source" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Type" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Base" RESTART IDENTITY CASCADE;

INSERT INTO "Type" (code, description) VALUES ('defaultType', 'Default test type');
INSERT INTO "Category" (code, description) VALUES ('defaultCategory', 'Default test category');
INSERT INTO "Source" (code, description) VALUES ('defaultSource', 'Default test source');
