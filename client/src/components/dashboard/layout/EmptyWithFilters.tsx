const EmptyWithFilters = () => {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">
        No items match your current filters.
      </p>
      <p className="text-sm mt-2">
        Try adjusting your filters to see more results.
      </p>
    </div>
  );
};

export default EmptyWithFilters;
