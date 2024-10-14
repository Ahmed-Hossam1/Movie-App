const Videos = ({ iSVideoplayed, SetVideoplayed, Video }) => {
  return (
    <div
      className={`fixed ${
        iSVideoplayed ? "block" : "hidden"
      } top-0 left-0  w-full h-full bg-neutral-900 bg-opacity-50   z-10 transition duration-200`}
    >
      <div className="bg-black w-[80%] h-[60%] z-30 relative top-1/2 left-1/2 rounded-md  -translate-x-1/2 -translate-y-1/2  ">
        <i
          className="fa-solid fa-x text-white/70  bg-red-600 rounded-full w-6 h-6 center-flex -top-2 -right-2 absolute cursor-pointer"
          onClick={() => SetVideoplayed(false)}
        ></i>
        {iSVideoplayed && (
          <iframe
            title="video"
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${Video[0]?.key}`}
            frameborder="0"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Videos;
