const CheckBox = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={`transition-all w-[24px] h-[24px] border-4 border-black flex items-center justify-center m-pointer ${
        checked ? 'bg-black' : 'bg-transparent'
      }`}
    >
    </div>
  );
};

export default CheckBox;