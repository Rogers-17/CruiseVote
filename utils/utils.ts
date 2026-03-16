
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Time calculations
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diffInSeconds < minute) return 'just now';
  if (diffInSeconds < hour)
    return `${Math.floor(diffInSeconds / minute)} minutes ago`;
  if (diffInSeconds < day)
    return `${Math.floor(diffInSeconds / hour)} hours ago`;
  if (diffInSeconds < month)
    return `${Math.floor(diffInSeconds / day)} days ago`;
  if (diffInSeconds < year)
    return `${Math.floor(diffInSeconds / month)} months ago`;

  return `${Math.floor(diffInSeconds / year)} years ago`;
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return views.toString();
}

export interface VideoTypes {
  id: number;
  thumbnailURL?: any;
  videoDuration: any;
  userName?: string;
  useravatar?: any;
  description: string;
  views: number;
  uploadDate: string;
}


