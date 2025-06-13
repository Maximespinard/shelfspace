import MotionDiv from '../ui/animated/MotionDiv';

const ItemGrid = () => {
  return (
    <MotionDiv
      variant="fadeInUp"
      delay={0.1}
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {/* + tard : items.map(item => <ItemCard key={item.id} item={item} />) */}
    </MotionDiv>
  );
};

export default ItemGrid;
