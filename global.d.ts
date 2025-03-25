/**
 *  Global type declarations
 */

declare type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

declare interface GlassdoorJobPosting {
  jobview: {
    overview: {
      squareLogoUrl: string;
    };
    header: {
      employerNameFromSearch: string;
      rating: number;
      locationName: string;
    };
    job: {
      listingId: number;
      jobTitleText: string;
    };
  };
}