import { screen } from 'electron';

export function setupMonitor(mainWindow) {
  const updatePosition = () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    
    // Position widget on the right edge
    const windowBounds = mainWindow.getBounds();
    mainWindow.setPosition(width - windowBounds.width - 20, 40);
  };

  screen.on('display-added', updatePosition);
  screen.on('display-removed', updatePosition);
  screen.on('display-metrics-changed', updatePosition);

  // Initial positioning
  updatePosition();
}
