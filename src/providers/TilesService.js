import { loadFromHash } from "./utils";

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

export const updateGridSize = (oldGridSize, newGridSize, oldTiles) => {
  // Save tiles along with their grid coordinates
  const save = new Map();
  oldTiles.forEach((tile, i) => {
    const coords = indexToPosition(i, oldGridSize);
    save.set(coords, tile);
  });

  // Create new empty board
  const newTiles = createTiles(newGridSize, false);

  // Restore saved tiles, getting their new index from their grid coordinates
  save.forEach((tile, coords) => {
    const newIdx = positionToIndex(coords.tileX, coords.tileY, newGridSize);
    if (newIdx > -1 && newIdx < newTiles.length) {
      newTiles[newIdx] = tile;
    }
  });

  return newTiles;
};

export const availableTiles = new Array(
  constants.numTilesX * constants.numTilesY
)
  .fill(1)
  .map((_, i) => indexToTileXY(i));

export const createTiles = (gridSize, randomize = true) =>
  new Array(gridSize * gridSize)
    .fill(0)
    .map((_, i) => (randomize ? Math.floor(Math.random() * 72) : 0));

export const loadStateFromHash = (
  baseGridSize = 6,
  baseTiles = createTiles(baseGridSize),
  maybeHash
) => {
  const data = loadFromHash(maybeHash);
  if (
    data &&
    data.gridSize &&
    typeof data.gridSize === "number" &&
    data.tiles &&
    data.tiles instanceof Array
  ) {
    baseGridSize = data.gridSize;
    baseTiles = data.tiles;
  }

  return {
    gridSize: baseGridSize,
    tiles: baseTiles
  };
};
