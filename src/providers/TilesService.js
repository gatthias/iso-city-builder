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

  return { tileX, tileY, x, y };
};

export const indexToBgPosition = i => {
  const { tileX, tileY } = indexToTileXY(i);
  return `${(tileX / (constants.numTilesX - 1)) * 100}% ${(tileY /
    (constants.numTilesY - 1)) *
    100}%`;
};

export const tileToBgPosition = ({ x, y }) => {
  return `${(x / constants.tileSizeX / (constants.numTilesX - 1)) * 100}% ${(y /
    constants.tileSizeY /
    (constants.numTilesY - 1)) *
    100}%`;
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
    left: `${(tileX - tileY - 1) * 64 + offsetX}px`,
    top: `${(tileX + tileY) * 32 + offsetY}px`
  };
};

export const availableTiles = new Array(
  constants.numTilesX * constants.numTilesY
)
  .fill(1)
  .map((_, i) => indexToTileXY(i));

export const stateToB64 = (gridSize, tiles) =>
  Buffer.from(JSON.stringify({ gridSize, tiles })).toString("base64");

export const B64ToState = str => JSON.parse(Buffer.from(str, "base64"));
//eyJncmlkU2l6ZSI6NiwidGlsZXMiOlswLDQ0LDQ0LDQ0LDQ0LDAsNDUsNzAsNjUsNjQsNDksNDMsNDUsNiwxLDYsNDksNDMsNDUsMzgsOCw0MCw0OSw0Myw0NSw2OSw2LDcxLDQ4LDQzLDAsNDIsNiw0Miw0MiwwXX0=
