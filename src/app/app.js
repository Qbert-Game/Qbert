import app from 'appModule';
import shared from 'shared';
import components from 'components';
import buildComponents from 'utils/buildComponents';
import buildShared from 'utils/buildShared';

import mockPromise from 'utils/mockPromise';
import mocks from 'mocks';

import routes from 'appRoutes';
import defaults from 'appDefaults';
import run from 'appRun';
import config from 'appConfig';

import styles from '../assets/styles/style.less'

window.App = app;

buildComponents(components);
buildShared(shared);

app.defaults = defaults; // global settings
app.config(config);

app.config(routes);

app.mockPromise = mockPromise;
app.mocks = mocks;

app.run(run);
