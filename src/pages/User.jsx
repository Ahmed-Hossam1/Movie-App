const User = () => {
  const User = JSON.parse(localStorage.getItem("user"));
  return (
    <section id="user" className="py-28 h-[72vh]">
      <div className="container md:flex items-center  gap-20">
        <div className="profile-image  grid place-items-center  ">
          <img
            src={User?.profile_image? User.profile_image : "png"}
            alt={User?.name+ "image profile"}
            className="w-40 h-40 object-cover rounded-full mb-10 md:mb-5 "
          />
         
        </div>

        <div className="profile-data text-white border border-gray-700 p-5 flex-1 ">
          <span className="text-white/70  inline-block capitalize ">
            Name :{User?.name?User.name : ""}
          </span>
          <hr className="bg-gray-600 my-4 h-[1px] border-0" />

          <span className="text-white/70  inline-block capitalize ">
            username :{User?.username? User.username : ""}  
          </span>

          <hr className="bg-gray-600 my-4 h-[1px] border-0" />

          <span className="text-white/70  inline-block capitalize ">
            Email Address :{User?.email? User.email : ""}
          </span>
        </div>
      </div>
    </section>
  );
};

export default User;
