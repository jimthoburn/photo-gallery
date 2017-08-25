
// https://github.com/gulpjs/gulp
let gulp = require('gulp');

// https://www.npmjs.com/package/gulp-image-resize
let imageResize = require('gulp-image-resize');

let parallel = require("concurrent-transform");
let os = require("os");

const SOURCE_IMAGE_PATH     = 'images/original';
const GENERATED_IMAGE_PATH  = 'images';

const SIZES = [384, 512, 768, 1024, 1536, 2048];  // These can be any numbers you like! These particular sizes were chosen since they’re
                                                  // device-agnostic and multiples of 256, which may make the maths easier for your processor.
let sizesCursor;

// Create a copy of each image, at the requested size
function generateImages(size) {
  let folder = GENERATED_IMAGE_PATH + "/" + size + "-wide";

  console.log('Generating images at size: ' + size + ' pixels, in the folder: ' + folder);

  gulp.src(SOURCE_IMAGE_PATH + "/*.{jpg,png}")
    .pipe(parallel(
      imageResize({ width : size }),
      os.cpus().length
    ))
    .pipe(gulp.dest(folder))
    .on('end', generateNext);
}

function generateNext() {
  if (sizesCursor < SIZES.length) {
    generateImages(SIZES[sizesCursor]);
    sizesCursor++;
  }
}

gulp.task("default", function() {
  sizesCursor = 0;
  generateNext();
});
