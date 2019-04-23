import gulp from "gulp";
import less from "gulp-less";
import sass from "gulp-sass";
import cssmin from "gulp-cssmin";
import autoprefixer from "gulp-autoprefixer";
import signale from "signale";

import { join } from "path";
import { IOpts } from "../types";
import { IOutputOpts } from "../types";
import { existsSync, readdirSync } from "fs";

export default async function(dir: any, opts: IOpts) {
  const { cwd } = opts;
  const pkgPath = join(cwd, dir);

  const libDir = join(pkgPath, "lib");
  const themeDir = join(pkgPath, "theme");

  // 编译 Gulp
  if (existsSync(themeDir)) {
    // Todo: 改造成 .xy.library.js
    const type = themeDir.indexOf("element-ui") === -1 ? "less" : "scss";

    build(type, {
      themeDir,
      libDir
    });

    const taskInstance = gulp.task(type);
    if (taskInstance === undefined) {
      signale.error("Task not found!");
      return;
    }

    try {
      taskInstance.apply(gulp);
      signale.success(`Run task ${dir}`);
    } catch (err) {
      signale.error(err);
    }
  }
}

export async function build(type: String, outputOpts: IOutputOpts) {
  gulp.task(type, () => {
    const { themeDir, libDir } = outputOpts;
    // SASS、Less
    gulp
      .src(`${themeDir}/styles/index.${type}`)
      .pipe(type === "scss" ? sass().on("error", sass.logError) : less())
      .pipe(autoprefixer({
          browsers: ["ie > 9", "last 2 versions"],
          cascade: false
        })
      )
      .pipe(cssmin())
      .pipe(gulp.dest(libDir));

    // Font
    gulp
      .src(`${themeDir}/fonts/xy.*`)
      .pipe(gulp.dest(`${libDir}/fonts/`));
  })
}
