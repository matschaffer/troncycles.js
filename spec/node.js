
require.paths.unshift('spec', './spec/lib', 'lib', 'vendor')
require('jspec')

require('underscore-1.0.2')
recorderMock = require('recorderMock-0.3.0').recorderMock

require('troncycles')
require('troncycles/bike')
require('troncycles/wall')

require('unit/spec.helper')

JSpec
  .exec('spec/unit/spec.wall.js')
  .exec('spec/unit/spec.bike.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
  .report()
