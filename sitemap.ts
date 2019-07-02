/**
 * Testing for sitemap crawling
 */

var _ = require('lodash');

export class RouteResolver {

    sitemapSource: string;
    defaultRoutes: string[];
    timeout = 15;

    constructor(
        sitemapSource: string,
        defaultRoutes: string[] = [],
        timeout = 15
    ) {
        this.sitemapSource = sitemapSource;
        this.defaultRoutes = defaultRoutes;
        this.timeout = timeout;
    }


    getRoutesFromSitemap () {
        var Sitemapper = require('sitemapper');
        var sitemapper = new Sitemapper();
        return sitemapper.fetch(this.sitemapSource).then( urls => {
            // console.log('Got urls', urls);
            const sitemapUrls = urls.sites.map( url => {
                // Remove protocol
                const partial = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
                // Remove domain
                return partial.substr(partial.indexOf('/')+1);
            });
            // console.log('sitemapUrls', sitemapUrls);
            return sitemapUrls;
        })
    }

    mergeRoutesFromSitemap () {
        return this.getRoutesFromSitemap().then(routes => this.defaultRoutes.concat(routes) );
    }

    getAllRoutes () {
        return this.mergeRoutesFromSitemap().then(paths => {
                return _.uniq(paths);
            }
        );
    };

}

// const rr = new RouteResolver('http://hld.mcmac.localhost/sitemap.xml', ['/','/home'], 3);
// rr.getAllRoutes().then(
//     r => {
//         console.log('Final response', r);
//     },
//     e => console.log('Error parsing routes', e)
// );


// Evaluates indexes, not data
// var sitemaps = require('sitemap-stream-parser');
// sitemaps.parseSitemaps(source, console.log, function(err, sitemaps) {
//     console.log('parser', sitemaps);
// });

// This gets all data but doesn't evaluate sitemap indexes
// var smta = require('sitemap-to-array');
// smta(source, function (stream) {
//     stream.on('error', function (error) {
//         console.error(error);
//     });
//     stream.on('data', function (data) {
//         console.log(data.toString());
//     });
// });

