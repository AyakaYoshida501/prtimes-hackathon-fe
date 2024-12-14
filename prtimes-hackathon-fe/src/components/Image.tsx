import { Image as BsImage } from "react-bootstrap";

type Props = {
  src: string;
  width?: string;
  alt: string;
};

export default function Image({ src, ...props }: Props): React.ReactElement {
  return <BsImage src={src} {...props} />;
}
