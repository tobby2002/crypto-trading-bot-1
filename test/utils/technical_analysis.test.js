let assert = require('assert');
let ta = require('../../utils/technical_analysis');

let fs = require('fs');

describe('#technical_analysis for candles', () => {
    it('technical_analysis for candles are returned', async () => {
        const result = await ta.getIndicatorsLookbacks(createCandleFixtures().reverse());

        assert.equal(result['ema_55'].length, 490)
        assert.equal(result['sma_200'].length, 291)

        assert.equal(8145, Math.round(result['ema_55'][0]))
        assert.equal(7994, Math.round(result['sma_200'][0]))
    })

    it('technical_analysis for options are created', async () => {
        const result = await ta.createIndicatorsLookback(createCandleFixtures().reverse(), [
            {
                'indicator': 'ema',
                'key': 'ema_55',
                'options': {
                    'length': 55,
                },
            },
            {
                'indicator': 'sma',
                'key': 'sma_200',
                'options': {
                    'length': 200,
                },
            },
            {
                'indicator': 'macd',
                'key': 'macd',
            }
        ]);

        assert.equal(result['ema_55'].length, 490)
        assert.equal(result['sma_200'].length, 291)

        assert.equal(8145, Math.round(result['ema_55'][0]))
        assert.equal(7994, Math.round(result['sma_200'][0]))
        assert.equal(0.31, parseFloat(result['macd'][1]['histogram']).toFixed(2))
    })

    it('technical_analysis for bollinger percent', () => {
        assert.equal(-20, ta.getBollingerBandPrice(80, 200, 100))
        assert.equal(120, ta.getBollingerBandPrice(220, 200, 100))
        assert.equal(50, ta.getBollingerBandPrice(150, 200, 100))
        assert.equal(-25, ta.getBollingerBandPrice(75, 200, 100))
    });

    var createCandleFixtures = function() {
        return JSON.parse(fs.readFileSync(__dirname + '/fixtures/xbt-usd-5m.json', 'utf8'));
    }
});
