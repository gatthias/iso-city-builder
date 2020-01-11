export const constants = {
  numTilesX: 12,
  numTilesY: 6,
  tileSizeX: 130,
  tileSizeY: 230
};

export const indexToTileXY = i => {
  const tileX = i % constants.numTilesX;
  const tileY = Math.floor(i / constants.numTilesX);
  const x = tileX * constants.tileSizeX;
  const y = tileY * constants.tileSizeY;

  return { x, y };
};

export const indexToBgPosition = i => {
  const { x, y } = indexToTileXY(i);
  return `-${x}px -${y}px`;
};

export const tileToBgPosition = ({ x, y }) => {
  return `-${x}px -${y}px`;
};

export const indexToPosition = (i, gridSize = 6) => {
  const tileX = i % gridSize;
  const tileY = Math.floor(i / gridSize);
  return { tileX, tileY };
};

export const positionToIndex = (tileX, tileY, gridSize = 6) =>
  tileY * gridSize + tileX;

export const indexToViewPosition = (
  i,
  gridSize = 6,
  offsetX = 0,
  offsetY = 0
) => {
  const { tileX, tileY } = indexToPosition(i, gridSize);

  return {
    left: `${(tileX - tileY) * 64 + offsetX}px`,
    top: `${(tileX + tileY) * 32 + offsetY}px`
  };
};

export const availableTiles = new Array(
  constants.numTilesX * constants.numTilesY
)
  .fill(1)
  .map((_, i) => indexToTileXY(i));
