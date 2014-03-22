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
                    },
                    {
                        src: "kissen-studio-4559199/assets/checkout.css",
                        dest: "kissen-studio-4559199/assets/checkout.css.liquid"
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
            scss: [ "kissen-studio-4559199/assets/style.css", "kissen-studio-4559199/assets/checkout.css"],
            js: [ "kissen-studio-4559199/assets/shop.js.liquid" ]
        },

        shopify: {
            options: {
                api_key: "35d8fcb8a7dddb2ba5abfef4d1207d26",
                password: "2f8094a44e95403b145836a758abbdff",
                url: "kissen-studio.myshopify.com",
                base: "kissen-studio-4559199/",
                theme: "4559199"
            }
        },

        watch: {
            scss: {
                files: "scss/**/*.scss",
                tasks: [ "compass:dist", "copy:scss", "clean:scss" ],
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
            },
            shopify: {
                files: [ "kissen-studio-4559199/**/*.liquid" ],
                tasks: [ "shopify" ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-shopify');

    // Default task.
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("compile", ["compass:dev", "copy", "clean"]);
    grunt.registerTask("prod", ["compass:dist", "copy", "clean"]);
};
