const VibratingError = ({ error }: { error: string }) => {
  return (
    <div className="text-red-800 vibrate-textp-0 m-0">
      {error}
    </div>
  );
};
export default VibratingError;