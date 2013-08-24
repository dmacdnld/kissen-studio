"use strict";

/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        options: {
            assets: "kissen-studio-4559199/assets"
        },

        compass: {
            dist: {
                options: {
                    sassDir: "scss",
                    cssDir: "kissen-studio-4559199/assets",
                    environment: "production",
                    outputStyle: "compressed",
                    noLineComments: true
                }
            },
            dev: {
                options: {
                    sassDir: "scss",
                    cssDir: "kissen-studio-4559199/assets",
                    outputStyle: "expanded",
                    noLineComments: false,
                    debugInfo: true
                }
            }
        },

        copy: {
            scss: {
                files: [
                    {
                        src: "kissen-studio-4559199/assets/style.css",
                        dest: "kissen-studio-4559199/assets/style.css.liquid"
                    }
                ]
            },
            js: {
                files: [
                    {
                        src: "kissen-studio-4559199/assets/shop.js",
                        dest: "kissen-studio-4559199/assets/shop.js.liquid"
                    }
                ]
            }
        },

        clean: {
            scss: ["kissen-studio-4559199/assets/style.css"],
            js: ["kissen-studio-4559199/assets/shop.js.liquid"]
        },

        watch: {
            scss: {
                files: "scss/**/*.scss",
                tasks: ["compass:dev", "copy:scss", "clean:scss"],
                options: {
                    interrupt: true
                }
            },
            js: {
                files: "kissen-studio-4559199/assets/shop.js",
                tasks: ["clean:js", "copy:js"],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    // Default task.
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("compile", ["compass:dev", "copy", "clean"]);
    grunt.registerTask("prod", ["compass:dist", "copy", "clean"]);
};
