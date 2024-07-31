export interface ICategory {
  id: string;
  parent: string;
  title: string;
  fa_icon: string;
  featured_img: string;
  show_menu: string;
  created_by: string;
  create_time: string;
  status: string;
}
export interface ISliderImage {
  id: string;
  slide_order: string;
  featured_img: string;
  title: string;
  url: string;
  description: string;
  created_by: string;
  create_time: string;
  status: string;
}
export interface ISTopUsers {
  id: string;
  slide_order: string;
  featured_img: string;
  title: string;
  url: string;
  description: string;
  created_by: string;
  create_time: string;
  status: string;
}
export interface ISBlogs {
  id: string;
  slide_order: string;
  featured_img: string;
  title: string;
  url: string;
  description: string;
  created_by: string;
  create_time: string;
  status: string;
}
export interface IDiscountBannerImage {
  create_time: string;
  created_by: string;
  description: string;
  featured_img: string;
  id: string;
  slide_order: string;
  status: string;
  title: string;
  url: string;
}
