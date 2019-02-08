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
  console.log(`${responseJson.data[0].fullName} ${responseJson.data[3].description} ${responseJson.data[3].url}`)
  $('.results-list').empty();
  $('.results-title').removeClass('hidden');
  for (let i = 0; i < responseJson.data.length; i++) {
  $('.results-list').append(`<h3>${responseJson.data[i].fullName}</h3> 
    <p>${responseJson.data[i].description}</p> 
    <a href="${responseJson.data[i].url}">More Infomation</a></p>`);
  }
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let stateInput = $('.stateInput').val();
    let maxResults = $('.maxResults').val();
    let finalInput = `https://api.nps.gov/api/v1/parks?stateCode=MO&limit=10`; 
    getParks(finalInput, maxResults);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});