module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'test/bootstrap/node'
      },
      tests: [
        'test/*.test.js'
      ]
    }
  })

  grunt.registerTask('test', [
    'mochaTest'
  ])

  // Alias default task to test
  grunt.registerTask('default', [
    'test'
  ])
}
