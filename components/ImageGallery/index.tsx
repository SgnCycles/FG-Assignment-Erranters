import { LightGallery, LightGalleryItem } from "@lightgallery/react";
import Thumbnail from "@lightgallery/react/plugins/thumbnail";
import Zoom from "@lightgallery/react/plugins/zoom";
import { JustifiedGrid } from "@lightgallery/react/plugins/justified";
import { ImageGalleryType } from "./types";

const ImageGallery = ({ postImages }: { postImages: ImageGalleryType[] }) => {
  
  const imageItems = postImages.map((image) => ({
    src: image.image_url,
    thumb: image.image_url,
    alt: "post image",
  }));

  return (
    <LightGallery plugins={[Thumbnail, Zoom]} zoom={{ scale: 1.5 }} thumbnail={{ animateThumb: false }} className="lg-custom-thumbnails" allowMediaOverlap>
      <JustifiedGrid rowHeight={120} gap={10} lastRow="justify">
        {imageItems.map((image, index) => (
          <LightGalleryItem key={index} item={image} href={image.src}>
            <img src={image.src} alt={image.alt} className="h-20 w-auto object-cover hover:brightness-80"/>
          </LightGalleryItem>
        ))}
      </JustifiedGrid>
    </LightGallery>
  );
};

export default ImageGallery;