#Lesson One: Intro

##Introduction
First, thanks for purchasing this course. I think you will get a lot out of it, and I hope you have fun working through the lessons. I think the best place to start is to show you what we're going to be building and some of the mechanics of the class.

As you know, this course is designed to help you dive into React + GraphQL. Although we wont be building a particularly complicated application, it will tie in all the concepts you will need to get started building a GraphQL server, connecting to a GraphQL client, and building a interface for your API using React. Concepts you will understand at the end of this course are:

* How GraphQL servers handle requests, gather data from your database as well as 3rd party APIs, and how your payload gets delivered to your client
* How a GraphQL enabled client makes requests and handles the payload returned from your server
* How to get GraphQL data into your React components
* How to modify data on your GraphQL server from your User interface

We will be relying on a few other tools to help us get up and running; most notably, the Apollo Stack from the Meteor Development Group.

The application we're going to be building is a beer review web application. I chose this particular app because I think it's fun, and it also ties in all the concepts that we are going to be exploring with React, GraphQL, and the Apollo Stack. We also have a nice rich data source we can use for descriptions, images, and other beer details.

But before we get into the application, let's take a high-level overview of the whats and whys of GraphQL.

##GraphQL

###What is GraphQL?

GraphQL is an *application* layer query language for fetching data from any backend - SQL, MongoDB, Redis. What does that mean? It means that GraphQL is a thin layer of abstraction between your client and your backend that acts as a go-between, fetching and mutating data.

It's important to understand that GraphQL is a a *specification* rather than an *implementation*. This means that Facebook is relying on the community to develop full implementations of the spec for use in your applications. The *reference* implementation for JavaScript is [express-graphql](https://github.com/graphql/express-graphql) which will help you get a GraphQL server running with Express. This is a *reference* implementation so may not be as full-featured as you'd want to get going building your own GraphQL server. More on that later.

####Some GraphQL specific features:

#####Single Endpoint

One of the first things you will see when you start using GraphQL is that you have a single endpoint `/graphql` from which all your data will flow and to which you post all of your data actions. This is quite different from the usual REST style APIs that have pre-scripted end-points. This may strike you as strange, coming from REST land.

#####Client-Specified Queries

The actual queries you will write look a lot like the JSON you expect to receive back from your server. An example query:

`{
  user(id: 3500401) {
    id,
    name,
    isViewerFriend,
    profilePicture(size: 50)  {
      uri,
      width,
      height
    }
  }
}`

Will return the data:

`{
  "user" : {
    "id": 3500401,
    "name": "Jing Chen",
    "isViewerFriend": true,
    "profilePicture": {
      "uri": "http://someurl.cdn/pic.jpg",
      "width": 50,
      "height": 50
    }
  }
}`

All the magic happens in your resolvers and mutations (more on that later). With this structure it is the client, rather than the server, that determines what data is returned.

An immediate implications of this method is that working on your API becomes far simpler; you don't have to worry about breaking end-points or versioning your API because the endpoint is always the same. The only thing that needs to change on the client side is the data requested in the query.

#####One Round-Trip

Typically in a REST architecture, your client might have to make several round-trips in order to gather the data it needs to render, calling various end-points. With GraphQL, all that data-wrangling is done on the server, and the client gets one payload with all the data it requested in the query, significantly reducing network requests.

####Some Terminology:

We're not going to go into any detail here, but just so you have a general idea of what we're talking about when referencing some terminology.

#####Resolvers

A resolver is exactly what is sounds like: it's a server-side function that retrieves some data, optionally manipulates it, and returns it to the querying client. It's the part of your GraphQL server that decides what data to return to the client.

#####Mutations

A mutation is a string that looks much like a query string, but changes the underlying database in some way. Simple as that. Use them to create, update, delete, or whatever else you do to change your data.

#####Fragments

Fragments are a way to define a grouping of commonly used fields and reuse them in your queries. For example if you are rendering a list of blog posts and want info on the Author, you can include a fragment (predefined set of fields) in your blog post requests and you will get that info returned from a single query. All this saves you round trips to the server.

####Why Use GraphQL?

Where GraphQL really shines, showcased in the application we'll be building in this course, is when you are wrangling data from multiple data sources. For example, when using data from your own database as well as data pulled in from a 3rd party API. Your client doesn't need to be concerned with calling multiple servers, only the neat GQL endpoint.

Another use-case is if your data lives in multiple databases that you own. Say you have a legacy PostgresDB and a shiny new MongoDB but need data from both. With GraphQL your client doesn't need to know anything about this, you just construct your query strings and handle the wrangling on your GraphQL server.

GraphQL essentially allows you to do really fancy joins that span multiple data sources and return a neat data payload to your client with exactly the data they expect.

Good for:
* Integrating 3rd Party data into your app
* Connecting two of your own databases, no matter the format

###Apollo Stack

Again, GraphQL is just a spec released to the open source community by Facebook. In order to use GraphQL, you will need to use (or roll your own) GraphQL implementation.

This is where the Apollo Stack comes in. The Apollo Stack is a new project from the Meteor Development Group, the group behind the Meteor web app framework. It's now pretty clear that they are repositioning themselves, and Apollo is their next effort. That aside, Apollo is a stack that integrates GraphQL and Redux to get you started quickly and with some good tooling built in.

#####Stuff you Get with the Apollo Stack

* A simple way to configure and initialize your GraphQL server on top of Express
* A solid and slightly less verbose method for getting data into your React components


###Conclusion

So now we have a conceptual introduction to GraphQL spec, why we might use it, and the specific implementation we are going to use in our app.

So with that, let's dive into the application itself!
