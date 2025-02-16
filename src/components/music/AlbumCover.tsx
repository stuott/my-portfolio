interface AlbumCoverProps {
  mbid: string;
  alt: string;
}

const AlbumCover = ({ mbid, alt }: AlbumCoverProps) => {
  const link = `https://coverartarchive.org/release-group/${mbid}/front-1200`;
  return <img src={link} alt={alt} className="w-40 h-40" />;
};

export default AlbumCover;
