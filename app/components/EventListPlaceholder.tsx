const EventPlaceholder = () => (
  <article className="w-full flex items-center space-x-4 p-3">
    <div className="h-12 w-12 rounded-lg u-pulse" />
    <div className="w-full space-y-2">
      <div className="h-4 w-1/3 rounded-sm u-pulse" />
      <div className="h-4 w-2/3 rounded-sm u-pulse" />
      <div className="h-4 w-1/3 rounded-sm u-pulse" />
    </div>
  </article>
);

const EventListPlaceholder = () => {
  return (
    <div className="space-y-3 -ml-3">
      {[1, 2, 3, 4, 5].map((num) => (
        <EventPlaceholder key={num} />
      ))}
    </div>
  );
};
