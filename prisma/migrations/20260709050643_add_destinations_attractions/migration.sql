-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "highlights" TEXT NOT NULL,
    "itinerary" TEXT,
    "inclusions" TEXT,
    "exclusions" TEXT,
    "faqs" TEXT,
    "map" TEXT,
    "duration" TEXT,
    "difficulty" TEXT,
    "ageGroupMin" INTEGER,
    "ageGroupMax" INTEGER,
    "maxGroupSize" INTEGER,
    "altitude" TEXT,
    "season" TEXT,
    "location" TEXT,
    "country" TEXT,
    "state" TEXT,
    "meetingPoint" TEXT,
    "price" TEXT,
    "discount" TEXT,
    "additionalNotes" TEXT,
    "images" TEXT NOT NULL,
    "gallery" TEXT,
    "thumbnail" TEXT,
    "banner" TEXT,
    "activities" TEXT,
    "tags" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishStatus" TEXT NOT NULL DEFAULT 'Published',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AdventureCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "linkType" TEXT NOT NULL DEFAULT 'internal',
    "activitySlug" TEXT,
    "customUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HomepageAdventureCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "iconType" TEXT NOT NULL DEFAULT 'lucide',
    "icon" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "buttonLink" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'Published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HeroSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "variant" TEXT NOT NULL DEFAULT 'home',
    "backgroundImages" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "buttonText" TEXT,
    "buttonLink" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT NOT NULL,
    "googleMapsUrl" TEXT,
    "socialLinks" TEXT,
    "businessHours" TEXT,
    "emergencyContact" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "shortDescription" TEXT,
    "fullDescription" TEXT,
    "heroImage" TEXT,
    "heroVideo" TEXT,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "latitude" TEXT,
    "longitude" TEXT,
    "googleMap" TEXT,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "duration" TEXT,
    "difficulty" TEXT,
    "altitude" TEXT,
    "bestSeason" TEXT,
    "weather" TEXT,
    "temperature" TEXT,
    "thingsToDo" TEXT NOT NULL DEFAULT '[]',
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "includedPackages" TEXT NOT NULL DEFAULT '[]',
    "nearbyPlaces" TEXT NOT NULL DEFAULT '[]',
    "faq" TEXT NOT NULL DEFAULT '[]',
    "howToReach" TEXT,
    "travelTips" TEXT NOT NULL DEFAULT '[]',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Attraction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Natural',
    "heroImage" TEXT,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "description" TEXT,
    "history" TEXT,
    "activities" TEXT NOT NULL DEFAULT '[]',
    "location" TEXT,
    "state" TEXT,
    "bestTime" TEXT,
    "entryFee" TEXT,
    "timings" TEXT,
    "travelTips" TEXT NOT NULL DEFAULT '[]',
    "nearbyHotels" TEXT NOT NULL DEFAULT '[]',
    "restaurants" TEXT NOT NULL DEFAULT '[]',
    "packages" TEXT NOT NULL DEFAULT '[]',
    "faqs" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "icon" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "date" DATETIME,
    "tags" TEXT,
    "categories" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "visibility" TEXT NOT NULL DEFAULT 'Published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WebsiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "websiteName" TEXT NOT NULL DEFAULT 'Ibex Adventure',
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "footerText" TEXT,
    "copyrightText" TEXT,
    "socialLinks" TEXT,
    "analyticsCode" TEXT,
    "globalSeoTitle" TEXT,
    "globalSeoDesc" TEXT,
    "metaTags" TEXT,
    "themeColors" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "sizeBytes" INTEGER,
    "folder" TEXT NOT NULL DEFAULT 'Uncategorized',
    "source" TEXT NOT NULL DEFAULT 'local',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContentVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelName" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "editor" TEXT NOT NULL DEFAULT 'System',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AdventureCategory_slug_key" ON "AdventureCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Attraction_slug_key" ON "Attraction"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_slug_key" ON "Activity"("slug");
