import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import cssmin from "gulp-cssmin";
import less from "gulp-less";
import sass from "gulp-sass";
import signale from "signale";

import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { IOpts } from "../types";
import { IOutputOpts } from "../types";

export default async function(dir: string, opts: IOpts) {
  const { cwd } = opts;
  const pkgPath = join(cwd, dir);

  const libDir = join(pkgPath, "lib");
  const themeDir = join(pkgPath, "theme");

  // 编译 Gulp
  if (existsSync(themeDir)) {
    // Todo: 改造成 .xy.library.js
    const type = "less";

    await addGulpTask(type, {
      libDir,
      themeDir,
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

async function addGulpTask(type: string, outputOpts: IOutputOpts) {
  gulp.task(type, () => {
    const { libDir, themeDir } = outputOpts;

    gulp
      .src(`${themeDir}/styles/index.${type}`)
      .pipe(type === "scss" ? sass().on("error", sass.logError) : less())
      .pipe(autoprefixer({ browsers: ["ie > 9", "last 2 versions"], cascade: false }))
      .pipe(cssmin())
      .pipe(gulp.dest(libDir));

    gulp.src(`${themeDir}/fonts/xy.*`).pipe(gulp.dest(`${libDir}/fonts/`));
  });
}
