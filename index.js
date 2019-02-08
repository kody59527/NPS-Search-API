'use strict';

function getParks(finalInput) {
  fetch(finalInput)
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson)
      if (responseJson.total === 0) {
        $('.results-list').empty();
        $('.errorMessage').replaceWith(`<p class='errorMessage'>Results not found. Please try again.</p>`);
        $('.results-title').addClass('hidden');
        $('.results').removeClass('hidden');
      } else {
        $('.errorMessage').addClass('hidden');
        clearResults(responseJson);
      }
    })
    .catch(error => console.log(error));
}

function resultsDisplayed(responseJson) {
  let resultsTotal = 0;
  if (responseJson.total > responseJson.limit) {
    resultsTotal = responseJson.limit;
  } else {
    resultsTotal = responseJson.total;
  }
  displayResults(responseJson, resultsTotal)
}

function clearResults(responseJson) {
  $('.results-list').empty();
  $('.results-title').removeClass('hidden');
  resultsDisplayed(responseJson);
}

function displayResults(responseJson, resultsTotal) {
  for (let i = 0; i < resultsTotal; i++) {
    console.log(`${i} out of ${resultsTotal - 1}`);
    $('.results-list').append(`<h3>${responseJson.data[i].fullName}</h3> 
    <p>${responseJson.data[i].description}</p> 
    <a href="${responseJson.data[i].url}">More Infomation</a></p>`);
  }
  $('.results').removeClass('hidden');
}

function watchForm(finalInput) {
  $('form').submit(event => {
    event.preventDefault();
    addStates();
  });
}

function formURL(finalStates) {
  let maxResults = $('#maxResults').val();
  const apiKey = 'U4N1OSnFxeDl8IxdPwpTktal1Kqq6lDhsq8l7uCs';
  let finalInput = `https://api.nps.gov/api/v1/parks?stateCode=${finalStates}&limit=${maxResults}&api_key=${apiKey}`; 
  getParks(finalInput);
}

function addStates() {
  let stateInput = $('#stateInput').val();
  let stateInputTwo = $('#stateInputTwo').val();
  let finalStates = ' '; 
  if (stateInputTwo === '') {
    finalStates = stateInput;
  } else {
    finalStates = stateInput + '&statecode=' + stateInputTwo;
  }
  formURL(finalStates);
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});