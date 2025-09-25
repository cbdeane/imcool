# Indigo Digital Portfolio

A modern, responsive portfolio website showcasing 3D rendering and digital art work.

## Quick Start

### Prerequisites

- **Node.js**: Install Node.js version 22 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd imcool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

**Hot reload development server:**
```bash
npm run dev
```
- Opens automatically at `http://localhost:3000`
- Files auto-reload on changes

### Production Build

**Build for production:**
```bash
npm run build
```

**Your production-ready website will be in the `dist/` folder**, ready to deploy to any web server.

## Video Optimization

### Current Large Videos
The portfolio currently contains very large video files that should be compressed for better web performance:

- `Car_Burn.mp4`: 86.3 MiB → Recommend compress to 5-10 MiB
- `ZPass.mp4`: 79.5 MiB → Recommend compress to 5-10 MiB
- `test-vid1.mp4`: 31.5 MiB → Recommend compress to 3-5 MiB

### Video Compression Settings
For optimal web performance, compress videos with:
- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080 max
- **Bitrate**: 2-5 Mbps for high quality, 1-2 Mbps for good quality
- **Frame Rate**: 30fps max (24fps often sufficient)

**Tools for compression:**
- [HandBrake](https://handbrake.fr/) (Free)
- [FFmpeg](https://ffmpeg.org/) (Command line)
- Adobe Media Encoder (Professional)

### Logo Video Requirements
The current logo video needs improvements:
- **Light effect**: Ensure the light effect animation isn't cut off by the video frame
- **Background**: Change background to `#1d1d1f` (matches website background)
- **Size**: Compress to under 1 MiB if possible

## Asset Management

### Where to Place Files

**Images and Videos:**
```
assets/images/
├── Logo.mp4              # Main logo animation
├── Logo_Transparent.png  # Navigation logo
├── portfolio-video-1.mp4 # Gallery videos
├── portfolio-image-1.png # Gallery images
└── ...
```

### File Naming Convention

**Videos:**
- Use descriptive names: `car-burn-simulation.mp4`
- No spaces (use hyphens): `alidas-study.mp4`
- Keep names concise but clear

**Images:**
- Static renders: `character-design-kirke.png`
- Logo files: `Logo_Transparent.png`
- Use consistent format extensions

### Updating Gallery Content

To add new portfolio items, edit:
1. **HTML**: `src/portfolio.html` - Add new gallery items
2. **JavaScript**: `src/portfolio.js` - Update `totalImages` count
3. **Files**: Place assets in `assets/images/`

## Project Structure

```
├── src/
│   ├── css/           # Stylesheets
│   ├── *.html         # HTML templates
│   └── *.js           # JavaScript files
├── assets/
│   └── images/        # All media files
├── dist/              # Production build output
└── webpack.config.js  # Build configuration
```

## Deployment

1. Run `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Ensure server supports:
   - Static file serving
   - HTTPS (recommended)
   - Proper MIME types for videos

## Color Scheme

- **Primary Background**: `#1d1d1f`
- **Accent Color**: `#330099` (Logo purple)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#b3b3b3`

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with video autoplay support
# imcool
