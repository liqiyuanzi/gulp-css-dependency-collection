var through        = require('through2');
const path = require('path');
let depObj = {}
module.exports = (depKey,complie) => {
	return through.obj(function (file, enc, cb) {
		let text = file.contents.toString(enc || 'utf-8');
		let reg = /@import\s+["']([^'"]+)/g,r = '',depArr = []
		let filePath = file.dirname.replace(new RegExp(file.cwd),'').slice(1)
		
		let depPath = path.join(file.base,file.relative)
		while(r = reg.exec(text)){
			if(r && r.length)
				depArr.push(path.join(filePath,filePath.includes(file.extname) ? r[1] : r[1] + file.extname))
		}
		
		if(depArr.length){
			depArr.forEach((v)=>{
				depObj[v] = depObj[v] ? depObj[v] : []
				depObj[v].push(depPath)
				depObj[v] = [...new Set(depObj[v])];
			})
		}
		
		if((Object.prototype.toString.call(complie) == "[object Function]" )&&(depObj[depKey] && depObj[depKey].length)){
			depObj[depKey].forEach((f)=>{
				complie(f)
			})
		}
		return cb(null, file);	
	})
}