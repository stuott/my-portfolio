interface AlbumCoverProps {
  mbid: string;
}

const AlbumCover = ({ mbid }: AlbumCoverProps) => {
  const link = `https://coverartarchive.org/release-group/${mbid}/front-1200`;
  return <img src={link} alt="Album Cover" className="w-40 h-40" />;
};

export default AlbumCover;
