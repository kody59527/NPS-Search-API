'use strict';


const apiKey = 'U4N1OSnFxeDl8IxdPwpTktal1Kqq6lDhsq8l7uCs';

function getParks(stateInput, options) {
  fetch(stateInput, options)
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson)
      if (responseJson.message === 'Not Found') {
        $('.results-list').empty();
        $('.errorMessage').replaceWith(`<p class='errorMessage'>${responseJson.message}. Please try again.</p>`);
        $('.results-title').addClass('hidden');
        $('.results').removeClass('hidden');
      } else {
        $('.errorMessage').addClass('hidden');
        displayResults(responseJson);
      }
    })
    .catch(error => alert('Something went wrong. Please try again later.'));
}

function displayResults(responseJson) {
  $('.results-list').empty();
  $('.results-title').removeClass('hidden');
  for (let i = 0; i < responseJson.length; i++) {
    $('.results-list').append(`<p>Park Name: ${responseJson[i].name} <a href="${responseJson[i].url}">Link</a></p>`);
  }
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let stateInput = $('.stateInput').val();
    let maxResults = $('.maxResults').val();
    let finalInput = `https://api.nps.gov/api/v1/parks?stateCode=MO&limit=10`; 
    getRepos(finalInput, maxResults);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});