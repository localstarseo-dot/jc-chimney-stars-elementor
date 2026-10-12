// Explicit, visually reviewed photo lists. No general team or unrelated-service fallback.
const technician = (name, alt) => ({
  image: 'assets/photos/technicians/' + name + '.webp',
  width: 1448, height: 1086, alt
});
const suppliedCleaning = (name, alt) => ({
  image: 'assets/photos/ads/' + name + '.webp', alt
});

export default {
  repair: [
    technician('chimney-star-technicians-repairing-a-crown', 'Technicians working on a chimney crown'),
    technician('chimney-star-rooftop-repair-crew', 'Chimney repair crew working on rooftop masonry'),
    technician('chimney-star-technicians-at-work', 'Technicians repairing the top of a brick chimney'),
    technician('chimney-star-flashing-repair-crew', 'Technician working on chimney flashing at the roof junction'),
    technician('chimney-star-damper-replacement-service', 'Technicians servicing a fireplace damper'),
    technician('chimney-technicians-replacing-fireplace-damper', 'Technicians replacing a fireplace damper'),
    technician('chimney-repair-consultation-outdoors', 'Technicians discussing chimney repair with a homeowner')
  ],
  cleaning: [
    technician('chimney-star-fireplace-service', 'Technicians cleaning the fireplace interior with service equipment'),
    technician('chimney-technicians-repairing-fireplace', 'Technicians removing debris from a fireplace with a shovel and bucket'),
    suppliedCleaning('sweep-before', 'Supplied chimney sweep photo before cleaning'),
    suppliedCleaning('sweep-after', 'Supplied chimney sweep photo after cleaning'),
    suppliedCleaning('blockage-before', 'Supplied chimney blockage photo before removal'),
    suppliedCleaning('blockage-after', 'Supplied chimney blockage photo after removal')
  ],
  inspection: [
    technician('chimney-inspection-consultation-by-the-fireplace', 'Technician explaining chimney inspection observations beside a fireplace'),
    technician('chimney-inspection-results-in-the-driveway', 'Technician reviewing chimney inspection information with a homeowner'),
    technician('technician-explains-chimney-inspection', 'Technician explaining chimney inspection findings outdoors')
  ]
};
