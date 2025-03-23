// eslint-disable-next-line import/prefer-default-export
export interface Profile {
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