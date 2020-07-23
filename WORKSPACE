workspace(
    name = "io_dasch_dsp_js_lib",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "5bf77cc2d13ddf9124f4c1453dd96063774d755d4fc75d922471540d1c9a8ea8",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/2.0.0-rc.0/rules_nodejs-2.0.0-rc.0.tar.gz"],
)


#
# install nodejs, npm, and yarn
#
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories")

# NOTE: this rule installs nodejs, npm, and yarn, but does NOT install
# your npm dependencies into your node_modules folder.
# You must still run the package manager to do this.
node_repositories(package_json = ["//:package.json"])

#
# install dependencies into @npm workspace.
# node_modules is managed by bazel and updated automatically on
# changes to package.json or package-lock.json
#
# yarn is preferred. see: https://bazelbuild.github.io/rules_nodejs/install.html#using-bazel-managed-dependencies
#
load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

