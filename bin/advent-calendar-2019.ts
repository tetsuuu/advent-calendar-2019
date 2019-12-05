#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AdventCalendar2019Stack } from '../lib/advent-calendar-2019-stack';

const app = new cdk.App();
new AdventCalendar2019Stack(app, 'AdventCalendar2019Stack');
