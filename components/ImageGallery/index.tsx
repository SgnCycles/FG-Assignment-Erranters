import { LightGallery, LightGalleryItem } from "@lightgallery/react";
import Thumbnail from "@lightgallery/react/plugins/thumbnail";
import Zoom from "@lightgallery/react/plugins/zoom";

const ImageGallery = () => {
  return (
    <LightGallery
      plugins={[Thumbnail, Zoom]}
      zoom={{ scale: 1.5 }}
      
    ></LightGallery>
  );
};

export default ImageGallery;
