"use strict";

module.exports = {
  listImages,
  createImage,
  readImage,
  updateImage,
  deleteImage,
};

const testData = {
  id: "0123456789",
  title: "Testowy obrazek",
  description: "Opis obrazka",
  date: "2023-01-08T15:30:00.214Z",
  path: "/library/images/",
  size: 1024,
};

function listImages(req, res, next) {
  res.json();
}

function createImage(req, res, next) {
  res.json();
}

function readImage(req, res, next) {
  res.json(testData);
}

function updateImage(req, res, next) {
  res.json();
}

function deleteImage(req, res, next) {
  res.json();
}
