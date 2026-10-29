const UpdateButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <button className="button-dark-primary" disabled={isPending}>
      {isPending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;