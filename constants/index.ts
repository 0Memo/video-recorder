export const MAX_VIDEO_SIZE = 500 * 1024 * 1024
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024

export const BUNNY = {
  STORAGE_BASE_URL: "https://storage.bunnycdn.com/memocast",
  CDN_URL: "https://memocast.b-cdn.net",
  TRANSCRIPT_URL: "https://vz-1f4ce220-241.b-cdn.net",
  EMBED_URL: "https://iframe.mediadelivery.net/embed",
  STREAM_BASE_URL: "https://video.bunnycdn.com/library",
}

export const emojis = ["😂", "😍", "👍"]

export const filterOptions = ["Most Viewed", "Most Recent", "Oldest First", "Least Viewed"]

// Correctly define the Visibility type and visibilities array
export type Visibility = "public" | "private" | string
export const visibilities: Visibility[] = ["public", "private"]

export const ICONS = {
  record: "/assets/icons/record.svg",
  close: "/assets/icons/close.svg",
  eye: "/assets/icons/eye.svg",
  search: "/assets/icons/search.svg",
  checked: "/assets/images/checked.png",
  upload: "/assets/icons/upload.svg",
  favicon: "/assets/icons/favicon.ico",
  link: "/assets/icons/link.svg",
  garbage: "/assets/icons/garbage.svg",
  arrowDown: "/assets/icons/arrow-down.svg",
  menu: "/assets/icons/menu.svg",
  video: "/assets/icons/video.svg",
  exit: "/assets/icons/exit.svg",
  test: "/assets/images/test.png",
  copyright: "/assets/icons/copyright.svg",
  google: "/assets/icons/google.svg",
  star: "/assets/icons/star.svg",
}

export const initialVideoState = {
  isLoaded: false,
  hasIncrementedView: false,
  isProcessing: true,
  processingProgress: 0,
}

export const infos = ["transcript", "metadata"]

export const DEFAULT_VIDEO_CONFIG = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30 },
}

export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
}

export const dummyCards = [
  {
    id: "1",
    title: "SnapChat Message",
    thumbnail: "/assets/samples/thumbnail(1).png",
    createdAt: new Date("2025-05-01"),
    userImg: "/assets/images/jason.png",
    username: "Jason",
    views: 10,
    visibility: "public",
    duration: 156,
  },
  {
    id: "2",
    title: "Product Demo Walkthrough",
    thumbnail: "/assets/samples/thumbnail(2).png",
    createdAt: new Date("2025-04-15"),
    userImg: "/assets/images/sarah.png",
    username: "Sarah",
    views: 245,
    visibility: "public",
    duration: 320,
  },
  {
    id: "3",
    title: "Weekly Team Update",
    thumbnail: "/assets/samples/thumbnail(3).png",
    createdAt: new Date("2025-04-22"),
    userImg: "/assets/images/michael.png",
    username: "Michael",
    views: 78,
    visibility: "private",
    duration: 412,
  },
  {
    id: "4",
    title: "Bug Fix Explanation",
    thumbnail: "/assets/samples/thumbnail(4).png",
    createdAt: new Date("2025-04-28"),
    userImg: "/assets/images/emily.png",
    username: "Emily",
    views: 32,
    visibility: "public",
    duration: 183,
  },
  {
    id: "5",
    title: "New Feature Overview",
    thumbnail: "/assets/samples/thumbnail(5).png",
    createdAt: new Date("2025-05-05"),
    userImg: "/assets/images/david.png",
    username: "David",
    views: 156,
    visibility: "public",
    duration: 275,
  },
  {
    id: "6",
    title: "Client Presentation Feedback",
    thumbnail: "/assets/samples/thumbnail(6).png",
    createdAt: new Date("2025-05-10"),
    userImg: "/assets/images/lisa.png",
    username: "Lisa",
    views: 89,
    visibility: "private",
    duration: 198,
  },
  {
    id: "7",
    title: "UI Design Review",
    thumbnail: "/assets/samples/thumbnail(7).png",
    createdAt: new Date("2025-05-12"),
    userImg: "/assets/images/alex.png",
    username: "Alex",
    views: 124,
    visibility: "public",
    duration: 230,
  },
  {
    id: "8",
    title: "Marketing Strategy Discussion",
    thumbnail: "/assets/samples/thumbnail(8).png",
    createdAt: new Date("2025-05-18"),
    userImg: "/assets/images/jessica.png",
    username: "Jessica",
    views: 67,
    visibility: "public",
    duration: 345,
  },
]