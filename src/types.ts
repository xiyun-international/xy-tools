export interface IOpts {
  cwd: string;
  cmd?: string;
  args?: { watch: boolean };
}

export interface IOutputOpts {
  themeDir: string;
  libDir: string;
}
