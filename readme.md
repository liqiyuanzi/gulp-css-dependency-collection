## Install
```
$ npm install gulp-css-dependency-collection --save
```
## Usage
```js
const gulp = require('gulp');
const gcdc = require('gulp-css-dependency-collection');
gulp.task('gcdc', (files) => {
	return gulp.src( files, { base : 'src' } ).pipe( gcdc(files,compile) )
                .pipe( gulp.dest( 'dist' ) );
});
gulp.watch( 'src/**/*' ).on( 'change', compile );
function compile( file ) {
	//被依赖文件也会重新编译
}
```




