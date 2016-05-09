master
======

(This is the repository for my master thesis.)


Managing client-side state has become increasingly complex as the web has changed from being a network for displaying static documents to the generation of dynamic content in single page applications we see today. This poses a threat to the notion of a network of uniquely identified resources as was the original intention of the World Wide Web. It often also breaks browser usability.

By implementing client-side state on a legacy website with complex server-side computations, this thesis investigate the difficulties of providing unique identifiers for dynamically generated content. Revealing some of the problems associated with accommodating to user expectations and sharing client-side state might mitigate some of the reluctance to implement the web standards.

In this thesis we look at difficulties concerning where and how to store state and issues concerning implementations of default web browser functionality like the back button, bookmarking and sharing of client state on a concrete use case. We discuss challenges that arise when applying client-side state management on top of an existing "thin-client" website with complicating server-side state logic.

The implementation is based on the Model View Controller architecture and modified to fit the web-client. 

About the use case:

Current research in biology and medicine often requires advanced computational analyses. A team of computer scientists, statisticians and biologists located here in Oslo have over the last five years been developing a system for statistical analysis of genome data (Hyperbrowser - http://hyperbrowser.uio.no/hb/ ). This is a public, web-based system that allows researchers in biology and medicine to specify advanced hypotheses related to e.g. the human genome through a set of standard selection boxes on a web page. A strength of the system is that it treats the genomic data in an abstract manner, thus allowing hypotheses related to a range of topics in biology and medicine to be handled by the same interface and underlying methodology. At the same time, this is also a main drawback of the system: by requiring users to think about their concrete biological/medical question in an abstract manner, the system may be difficult to use, especially for new users. In addition, some of the innocent looking selection boxes on the web page represent advanced statistical concepts, presenting a further challenge for usability. 


