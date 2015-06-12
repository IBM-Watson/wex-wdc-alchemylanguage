# Using Watson AlchemyAPI Language Services in Bluemix with Watson Explorer

The [Watson AlchemyAPI Bluemix Service](http://www.alchemyapi.com/) offers sophisticated natural language processing techniques to analyze the content and add high-level semantic information to documents crawled with Watson Explorer. In this tutorial, we demonstrate integrating six of the Alchemy Language text analysis functions which include Entity Extraction, Sentiment Analysis, Keyword Extraction, Concept Tagging, Relation Extraction and Taxonomy Classification. There are additional functions available via the AlchemyAPI service in Bluemix that will be covered in other integration examples.  Alchemy Language text analysis is frequently used in search-based applications for categorizing data and creating hierarchies that can be used for navigation through a result set. [Watson Explorer](http://www.ibm.com/smarterplanet/us/en/ibmwatson/explorer.html) can use Alchemy Language to aid in information discovery by improving navigation through uncategorized content.

The goal of this tutorial is to demonstrate how to get started with an integration between Watson Explorer and the Watson AlchemyAPI service available on IBM Bluemix. By the end of the tutorial you will have enriched the example-metadata crawl with entities discovered by Alchemy Entity Extraction and created an entity facet for a Watson Explorer Engine search.


## Prerequisites
Please see the [Introduction](https://github.com/Watson-Explorer/wex-wdc-integration-samples) for an overview of the integration architecture, and the tools and libraries that need to be installed to create Java-based applications in Bluemix.

- An [IBM Bluemix](https://ace.ng.bluemix.net/) account
- [Watson Explorer](http://www.ibm.com/smarterplanet/us/en/ibmwatson/explorer.html) - Installed, configured, and running
- An API key from the [AlchemyAPI website](https://www.alchemyapi.com/api/register.html)


## What's Included in this Tutorial

This tutorial will walk through the creation and deployment of three components.

1. A basic Bluemix application exposing the Watson AlchemyAPI service as a web service.
2. A Watson Explorer Engine custom converter. This converter sends text to the Bluemix application and uses the response to enrich searchable metadata for indexed documents.


## Step-by-Step Tutorial

This section outlines the steps required to deploy a basic Watson Alchemy Language application in Bluemix and the custom converter in Engine.

### Creating the AlchemyAPI service and application in Bluemix

A new AlchemyAPI service must be created via the ACE Bluemix web UI.  The AlchemyAPI service cannot be created via the commandline.  Navigate to https://bluemix.net and use the UI to create a new AlchemyAPI service.  Notice that you are required to provide your AlchemyAPI key when the service is created.  For the sake of the example, we have chosen to name the service `wex-AlchemyLanguage`.  Notice that "user-provided" is the only available service plan for AlchemyAPI right now.

Return to the dashboard and create a new application with Liberty for Java.  Bind your AlchemyAPI service to your new application.

   
### Configuring and Deploying the Watson Alchemy Language Web Service in Bluemix

The example Bluemix application uses a `manifest.yml` file to specify the application name, services bindings, and basic application settings.  Using a manifest simplifies distribution and deployment of CloudFoundry applications.

Modify the manifest.yml file to agree with the service name, application name, and host name of the service and application you created in the previous step.

To deploy the Watson Alchemy Language example application you'll need to compile the application and deploy it to Bluemix.

If you have not done so already, sign in to Bluemix.

```
$> cf api api.ng.bluemix.net
cf login
```

Build the application web service using [Apache Maven](http://maven.apache.org/). Before performing this step, verify that you are in the Bluemix directory. This will generate a packaged Java WAR called `wex-AlchemyLanguage.war`.

```
$> mvn install
```


Finally, deploy the application to your space in the Bluemix cloud.  If this is the first time deploying, the application will be created for you.  Subsequent pushes to Bluemix will overwrite the previous instances you have deployed.

```
$> cf push
```


Once the application has finished restarting, you should now be able to run a test using the simple application test runner included in the WAR.  You can view the route that was created for your application with `cf routes`.  The running application URL can be determined by combining the host and domain from the routes listing.  You can also find this information in the `manifest.yml` file. By default the route should be `AlchemyLanguage.mybluemix.net`.


### Watson Explorer Engine Converter for Alchemy Language in Bluemix

[IBM Watson Explorer](http://www.ibm.com/smarterplanet/us/en/ibmwatson/explorer.html) combines search and content analytics with unique cognitive computing capabilities available through external cloud services such as [AlchemyAPI](http://www.alchemyapi.com/) and [Watson Developer Cloud](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/) to help users find and understand the information they need to work more efficiently and make better, more confident decisions.

The Alchemy Language is a set of web services that enable advanced text analysis including sentiment analysis, entity extraction, and concept identification.  This converter currently integrates 6 of the Alchemy Language functions available.

* [Entity Extraction](http://www.alchemyapi.com/products/alchemylanguage/entity-extraction)
* [Sentiment Analysis](http://www.alchemyapi.com/products/alchemylanguage/sentiment-analysis)
* [Keyword Extraction](http://www.alchemyapi.com/products/alchemylanguage/keyword-extraction)
* [Concept Tagging](http://www.alchemyapi.com/products/alchemylanguage/concept-tagging)
* [Relation Extraction](http://www.alchemyapi.com/products/alchemylanguage/relation-extraction)
* [Taxonomy Classification](http://www.alchemyapi.com/products/alchemylanguage/taxonomy)

The full Alchemy Language API reference is available on [the AlchemyAPI website](http://www.alchemyapi.com/api).


# Using the Converter

The Alchemy Language Bluemix Engine converter can be used during any document ingestion (push or crawl) to enrich indexed documents with additional metadata that might be used for a variety of purposes in the context of search or entity-360 use cases.

## Adding the Converter to Engine

Follow these steps to add the converter to Engine.

1. In Engine, create a new XML Element.  The element and name can have any value.
2. Copy the entire contents of [function.vse-converter-alchemyapi-alchemylanguage-bluemix.xml](/engine/function.vse-converter-alchemyapi-alchemylanguage-bluemix.xml).
3. Paste the copied XML into the Engine XML text box, replacing all text that was previously there.
4. Save the converter configuration by clicking 'OK'

To use the Alchemy Language converter in an Engine search collection, navigate to the collection's converter tab, add a new converter, and select the Alchemy Language Bluemix converter.  The converter function will be available in the collection's conversion pipeline and is now ready to be configured.  For the purpose of this example, try adding the Alchemy Language converter to your example-metadata collection.

## Configuring the Alchemy Language Bluemix Converter

Supply the base URL for your Bluemix application in the setting provided.

Individual Alchemy functions must be enabled and are each individualy configured.  This allows you to, for example, use one set of content in one function and different content in another function.

Expand the Entity Extraction section of the converter and select the checkbox to enable Entity Extraction.

The results of the Alchemy Language API request will be stored as new `<content>` elements within the document.  Run a test-it to view the specific output of the converter.  One or more `<content>` elements are added to a document for each Alchemy Language service enabled.  Consider post-processing these elements in a subsequent custom converter if you would like to modify the data indexed.

Notice that the name of the new entity content is "alchemyapi-entity".  Navigate to the Configuration > Indexing tab of your collection.  Add "alchemyapi-entity" to your list of "fast index" contents.  Navigate to the Configuration > Binning tab of your collection.  Add a new top level binning component, select binning-set, and specify `$alchemyapi-entity` for the XPath and "Entity" for the label.  Add a new child component and click OK.  Finally, restart the indexer to pick up the new configuration.

Search your collection an notice that you have a new "Entity" facet on the left.  Click the "City" facet to restrict the result set to documents which mention a city.

Your crawled data has been enriched with Alchemy Language text analysis!


# Suggested Use Cases

The Alchemy Language Bluemix converter is intended to make it easier for Engine administrators to augment indexed content using Alchemy Language web services.  An augmented index might be useful in a variety of situations.  Here are some examples to help get you started.

* Use extracted entities to provide faceted navigation of persons, locations, and organizations as shown in this example.
* Autoclassify documents using the Alchemy Language [Taxonomy Classification](http://www.alchemyapi.com/products/alchemylanguage/taxonomy) or [Concept Tagging](http://www.alchemyapi.com/products/alchemylanguage/concept-tagging) functions.  This taxonomy might be used for faceting, "find related" searches, display, or combined with other analytics.
* Use mentions, entities, and the relations between them to construct a graphical representation of the relationships, allowing the user to navigate between common themes among documents. 
* Enhance passage search by substituting second-person references with primary references &mdash; for example, replace "he" with "Thomas J. Watson".
* Construct queries on the fly to enable "find similar" or "search for more like this" features.
* Combine with other systems to allow for comparative analysis with documents that might not otherwise be relatable.
* Substitute related extracted entities within a document with the equivalent terms _in position_ by using parallel indexing streams such that proximity search across related terms provides identical precision and recall.

# Implementation Considerations


- **Privacy and Security** - The Alchemy Language Bluemix converter makes a web request to the Bluemix application endpoint configured in the converter settings.  Under the covers, this is done by way of an AXL `<parse>` element.  In this example, this call is made over an unencrypted and unauthenticated HTTP connection, but your Bluemix application can be modified to support better security.
- **Crawl performance** - As the converter will be making web services calls to Bluemix, document conversion will be slower compared to converters not using that call out to web services.  We anticipate that conversion performance will be comparable to using a local text analytics engine (for example the Content Analytics converter) but this is highly dependent on the network, data, and other factors.
- **Failures will happen** - All distributed systems are inherently unreliable and failures will inevitably occur when attempting to call out to Bluemix.  Carefully consider how failures should be handled at conversion time. Should the whole document fail? Is a partially indexed document without enriched metadata from Alchemy Language OK?
- **Managing development costs** - Every document and every Alchemy Language function used counts toward your [daily and monthly AlchemyAPI transaction limits](http://www.alchemyapi.com/products/pricing/alchemylanguage). We've created [a simple test server](/test/mock-server) that can return a canned API response.  This test server can be used during development to help manage development time and costs. Keep in mind that the current converter will make one API call per function.
- **Data Preparation** - It is the responsibility of the caller to ensure that representative data is being sent to the Alchemy Langauge APIs.  Additional data preparation may be required in some cases.  For example, some Engine converters will retain a subset of HTML tags such as PDFtoHTML or WordtoHTML.  These tags provide hints to the indexer but in a content snippet would become encoded XML. This means `<span>` would become `&lt;span&gt;` which would count as 12 characters toward the AlchemyAPI string length limit -- and 12 fewer characters of text that might be representative of the document you're analyzing.  Choose content carefully and be sure it is clean enough for analysis.
- **Scalability** - This example uses only a single cloud instance with the default Bluemix application settings.  In a production scenario consider how much hardware will be required and adjust the Bluemix application settings accordingly.

## Caching Proxy
Given the considerations listed here, the use of a caching proxy is always recommended in a Production environment.  Using a caching proxy can speed up refreshes and recrawls in some situations, overcome some network failures, and in some cases may also allow you to reduce the total number of required AlchemyAPI transactions.


# Licensing
All sample code contained within this project repository or any subdirectories is licensed according to the terms of the MIT license, which can be viewed in the file license.txt.



# Open Source @ IBM
[Find more open source projects on the IBM Github Page](http://ibm.github.io/)

    
