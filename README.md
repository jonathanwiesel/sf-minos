sf-minos
===

This module is a(n incomplete) proof-of-concept to detect unused metadata components by exploring and analyzing their dependencies.

Taking into account the current state of the [Dependency API](https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_metadatacomponentdependency.htm) it makes no sense to continue evolving this idea since it requires quite some work on detecting and analyzing each of the possible dependant components metadata, work that the Dependency API doesn internally.